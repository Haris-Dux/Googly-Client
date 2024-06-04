import{u as p,a as g,D as b,r,b as f,j as e,L as i,k as w,E as y}from"./index-UqpOS-IH.js";const v=()=>{const n=p(),c=g(),m=b(),[o,d]=r.useState(!1),{user:a,loginLoading:x}=f(s=>s.auth),[t,l]=r.useState({email:"",password:""});r.useEffect(()=>{if(a!=null&&a.login){const s=new URLSearchParams(m.search).get("from")==="cart";n(s?"/cart":"/")}});const u=s=>{s.preventDefault(),c(y(t))},h=()=>{d(!o)};return e.jsx(e.Fragment,{children:e.jsx("section",{className:"bg_auth py-7 sm:py-10 px-0 sm:px-4 md:px-14",children:e.jsx("div",{className:"max-w-5xl xl:max-w-4xl mx-auto",children:e.jsx("div",{className:"flex justify-center items-center flex-col-reverse sm:flex-row gap-10 md:gap-2 min-h-screen",children:e.jsxs("div",{className:"blur_bg border px-4 py-8 sm:p-12 rounded-2xl",children:[e.jsx("h1",{className:"Noto text-white max-w-xs sm:max-w-full text-center mb-5 text-3xl sm:text-4xl font-bold",children:"Login Your Account"}),e.jsx("p",{className:"max-w-full mb-5 text-white  text-sm sm:text-md text-center",children:"Sign in to access your account and explore exclusive offers."}),e.jsxs("form",{onSubmit:u,className:"space-y-4 md:space-y-6",children:[e.jsx("div",{children:e.jsx("input",{className:"bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600",type:"email",id:"email",name:"email",placeholder:"Enter Your Email",value:t.email,onChange:s=>l({...t,email:s.target.value}),required:!0})}),e.jsx("div",{children:e.jsx("input",{className:"bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-md block w-full p-3 placeholder:text-gray-600",type:o?"text":"password",id:"password",name:"password",placeholder:"Enter Your Password",value:t.password,onChange:s=>l({...t,password:s.target.value}),required:!0})}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-start",children:[e.jsx("div",{className:"flex items-center h-5",children:e.jsx("input",{"aria-describedby":"remember",className:"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0",id:"remember",type:"checkbox",onChange:h})}),e.jsx("div",{className:"ml-3 text-sm",children:e.jsx("label",{className:"text-gray-50 select-none cursor-pointer",htmlFor:"remember",children:"show password"})})]}),e.jsx(i,{to:"/forget",className:"text-sm font-medium text-primary-600 hover:underline text-gray-50",children:"Forgot password?"})]}),x?e.jsx("button",{className:"w-full h-11 items-center justify-center mx-auto bg-[#fff] text-white flex tracking-wide",children:e.jsx(w,{type:"ball-beat",active:!0})}):e.jsx("button",{type:"submit",className:"w-full h-11 items-center font-semibold mx-auto bg-[#DEC344] hover:bg-[#e3cc65] text-black flex justify-center tracking-wide",children:"LOGIN NOW"}),e.jsxs("p",{className:"text-sm font-light text-white ",children:["Don’t have an account yet?"," ",e.jsx(i,{to:"/signup",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"font-medium text-primary-600 hover:underline",children:"Sign up"})]})]})]})})})})})};export{v as default};
