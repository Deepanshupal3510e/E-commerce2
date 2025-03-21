
const forgotPasswordTamplate = ({name , otp}) => {
    return`
    <div> 
        <p style="font-size:20px; font-weight:bold;"> hii ${name} </p>
        <p> your account has requested to forgot you password if you are not send request so protect your account otherwise follow these steps </p>
        <p style="margin-top:20px; " > this is your one time password (OTP) </p>
        <p style="margin:20px; height:100px; background: #00ed43; color:white; font-size:30px; text-align:center; line-height:100px;"> ${otp} </p>
        <p> thanks for contact </p>
        <p> onlineShop </p>
     </div>
    `
}

export default forgotPasswordTamplate