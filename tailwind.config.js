module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        "img-size":"73%",
        "extra-img-size":"77%",
        "extra-form-size":"23%",
        "form-size":"27%",
        "w-resize-form-login":"28%",
        "menu-size":"250px",
        "img-modal":"350px",
        "admin-menu":"20%",
        "admin-page":"80%",
        "admin-menu-resize":"25%",
        "modal-img":"100%",
        "modal-size":"500px"
        
      },
      height:{
        "menu-size":"100px",
        "img-modal":"170px",
      },
      fontSize:{
        "9px":"9px",
        "10px":"10px",
        "11px":"11px",
        "12px":"12px",
        "13px":"13px",
        "14px":"14px",
        "15px":"15px",
        "16px":"16px"
      },
      colors:{
        normalBlue:"#1e81b0",
        primaryBlue:"#0a5b93"
      },
      backgroundColor:{
        normalBlue:"#1e81b0",
        primaryBlue:"#0a5b93"
      }
    },
  },
  plugins: [],
}