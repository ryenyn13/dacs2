import {v2 as cloudinary} from "cloudinary";
import axios from "axios"
import Cake from '../models/cake.model.js'

export const getAllCake = async (req, res) => {
  try {
      const cakes = await Cake.find().sort({ createdAt: -1 });
      if(cakes.length === 0) {
          return res.status(200).json([]);
      }
      res.status(200).json(cakes);
  } catch (error) {
      console.log("Error in get all cake controller", error.message);
      res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCake = async (req, res) => {
  try {
      const cake = await Cake.findById(req.params.id);
      if(!cake) {
          return res.status(404).json({message: "Cake not found"});
      }
      res.status(200).json(cake);
  } catch (error) {
      console.log("Error in get cake controller", error.message);
      res.status(500).json({ error: "Something went wrong" });
  }
};

export const addCake = async (req, res) => {
  const {cakeName, price, description } = req.body;
  const {images} = req.body;
  if (images) {
    const promises = images.map((image) => cloudinary.uploader.upload(image));
    const results = await Promise.all(promises);
    req.body.images = results.map((result) => result.secure_url);
  }
  const existingCake = await Cake.findOne({cakeName});
  if(existingCake){
    return res.status(400).json({error: "This cake is already have"});
  }
  const newCake = new Cake(req.body);
  await newCake.save();
  res.status(200).json(req.body);
}

export const deleteCake = async (req, res) => {
  try{
    const cake = await Cake.findById(req.params.id);
    if(!cake){
      return res.status(404).json({message: "Cake not found"});
    }
    if(cake.images){
      const promises = cake.images.map(image => {
        const imgId = image.split("/").pop().split(".")[0];
        return cloudinary.uploader.destroy(imgId);
      })
      await Promise.all(promises);
    }
    await Cake.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Deleted successfully"});
  } catch (error) {
    console.log("Error in delete cake controller", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export const deleteAllCake = async(req, res) => {
  try {
    const cakes = await Cake.deleteMany({});
    res.status(200).json({message: "Deleted successfully"});
  } catch (error) {
    console.log("Error in delete all cake controller", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}
// export const updateCake = async (req, res) => {
//   const { cakeName, price, description, quantity, images } = req.body;
//   const cakeId = req.params.id;
//   console.log("Cake ID received:", cakeId); // Debug ID
//   if (!cakeId) {
//     return res.status(400).json({ message: "Cake ID is missing" });
//   }
//   try {
//     // Tìm bánh theo ID
//     let cake = await Cake.findById(cakeId);
//     if (!cake) {
//       return res.status(404).json({ message: "Cake not found" });
//     }

//     // Nếu có hình ảnh mới, upload lên Cloudinary
//     if (images && images.length > 0) {
//       const promises = images.map((image) => cloudinary.uploader.upload(image));
//       const results = await Promise.all(promises);
//       req.body.images = results.map((result) => result.secure_url);
//     }

//     // Cập nhật các trường thông tin
//     cake.cakeName = cakeName || cake.cakeName;
//     cake.price = price || cake.price;
//     cake.quantity = quantity || cake.quantity;
//     cake.description = description || cake.description;
//     if (req.body.images) {
//       cake.images = req.body.images; // Cập nhật hình ảnh
//     }

//     // Lưu lại thay đổi
//     await cake.save();

//     res.status(200).json(cake);
//     console.log("Request received:", req.body);
//   } catch (error) {
//     console.error("Error in updateCake controller: ", error);
//     res.status(500).json({ message: "Internal Server error" });
//   }
// };

// export const updateCake = async (req, res) => {
//   const {cakeName, price, description, quantity} = req.body;
//   const {images} = req.body;
//   const cakeId = req.params.id;
//   try {
//       let cake = await Cake.findById(cakeId);
//       if(!cake) {
//           return res.status(404).json({ message: "Cake not found" });
//       }

//       if(images) {
//           const promises = images.map(image => cloudinary.uploader.upload(image));
//           const results = await Promise.all(promises);
//           req.body.images = results.map(result => result.secure_url);
//       }
//       cake.cakeName = cakeName || cake.cakeName;
//       cake.price = price || cake.price;
//       cake.quantity = quantity || cake.quantity;
      
//       cake.description = description || cake.description;

//       await cake.save();

//       res.status(200).json(cake);
//   } catch(error) {
//       console.log("Error in updateCake controller: ", error);
//       res.status(500).json({ message: "Internal Server error" });
//   }
// }
// Cập nhật thông tin bánh
export const updateCake = async (req, res) => {
  const { cakeName, price, description, quantity, images } = req.body; // Nhận dữ liệu từ client
  const cakeId = req.params.id;

  try {
    let cake = await Cake.findById(cakeId);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    if (images) {
      const uploadPromises = images.map((image) => cloudinary.uploader.upload(image));
      const uploadResults = await Promise.all(uploadPromises);
      req.body.images = uploadResults.map((result) => result.secure_url);
    }
    cake.cakeName = cakeName || cake.cakeName;
    cake.price = price || cake.price;
    cake.quantity = quantity || cake.quantity;
    cake.description = description || cake.description;
    if (req.body.images) {
      cake.images = req.body.images; 
    }
    await cake.save();
    res.status(200).json(cake);
  } catch (error) {
    console.error("Error in updateCake controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const findCake = async (req, res) => {
  try {
      const searchTerm = req.query.search.toLowerCase(); 
      const cakes = await Cake.find();

      const filteredCakes = cakes.filter(cake => 
          cake.cakeName.toLowerCase().includes(searchTerm)
      );

      res.status(200).json(filteredCakes);
  } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
  }
}
// export const editCake = async (req, res) => {
//   const { cakeName, price, description, images } = req.body; // Lấy dữ liệu từ yêu cầu

//   try {
//     const cake = await Cake.findById(req.params.id);
//     if (!cake) {
//       return res.status(404).json({ error: "Cake not found" });
//     }

//     // Cập nhật dữ liệu bánh
//     cake.cakeName = cakeName || cake.cakeName;
//     cake.price = price || cake.price;
//     cake.description = description || cake.description;
//     cake.images = images || cake.images;

//     await cake.save();

//     return res.status(200).json(cake); // Trả về bánh đã cập nhật
//   } catch (error) {
//     console.log("Error in updateCake controller: ", error);
//     res.status(500).json({ message: "Internal Server error" });
//     console.error(error);
//     return res.status(500).json({ error: "Failed to update cake" });
//   }
// };

