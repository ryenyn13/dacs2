import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex bg-white border-t-8 border-green-700">
        <div className="container mx-auto px-5 py-2 flex justify-between items-center">
          <div>
            <img
              src="https://marketingai.mediacdn.vn/wp-content/uploads/2018/06/HD-Pepsi-Logo-min-2-705x332.jpg"
              alt="logo"
              className="h-10"
            ></img>
          </div>
          <div classNameName="">
            <div className="items-center space-x-6 text-xs ">
              <a href="#">Trang chu</a>
              <a href="#">Kho sach</a>
              <a href="#">The loai</a>
              <a href="#">Tin tuc</a>
              <a href="#">Lien he</a>
            </div>
            <div className="flex items-center space-x-1">
              <a href="#">
                <img
                  src="data:image/png;base64,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"
                  alt="Search"
                  className="h-3"
                ></img>
              </a>

              <a href="#">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Cart"
                  className="h-10"
                ></img>
              </a>

              <a href="#">
                <img
                  src="https://cpng.pikpng.com/pngl/s/106-1060141_facebook-messenger-icon-facebook-messenger-icon-png-clipart.png"
                  alt="Mess"
                  className="h-3"
                ></img>
              </a>
            </div>
            <button className="bg-green-600 text-xs text-white py-1 px-3 rounded">
              Dang nhap
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

