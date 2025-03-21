const verifyEmailTemplate = ({name , url}) =>{
    return  `
    <p> Dear ${name} </p>
        <p> thank you for register in onlineShop </p>
        <a href=${url}  style="color:white; padding:15px; padding-bottom:15px;  background:#54e649;  border-radius:10px; margin: 10px; text-decoration: none;  " > Verify email </a>
    `
}


export default verifyEmailTemplate;