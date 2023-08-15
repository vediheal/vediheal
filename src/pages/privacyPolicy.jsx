import { styled } from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";

const Caption1 = styled.h1`
  color:#000000;
`
const Caption2 = styled.h2`
  color:#000000;
`

const PrivacyPolicy = () => {
  return (
    <>
      <Header/>
      <div style={{ backgroundColor: '#fce4de', color:  '#ff4d4d', padding: '20px' }} className="mt-6">
        <Caption1>Privacy Policy</Caption1>
        <p>The privacy policy outlines how "Vediheal" uses and protects any information provided by users on its website.</p>
        <p>"Vediheal" is committed to ensuring that your privacy is protected. Should we request for certain information to identify you on your next visit, you can be assured that it will only be used in accordance with this privacy statement.</p>
        <p>"Vediheal" may change this policy from time to time by updating this page. You should check this page to ensure that you are happy with the changes.</p>
        <Caption2>What we collect</Caption2>
        <ul>
          <li>Name and Address for Delivery</li>
          <li>Contact information including email address</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
        <Caption2>What we do with the information we gather</Caption2>
        <p>We require this information primarily to provide better service by understanding your needs along with the following reasons:</p>
        <ul>
          <li>Internal record keeping</li>
          <li>Improvement of our services and products</li>
          <li>Marketing purposes to send periodically promotional emails about new products, special offers or other information of interest to you. We may contact you by email or phone for the same.</li>
        </ul>
        <Caption2>Security</Caption2>
        <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure this information.</p>
        <Caption2>Controlling your personal information</Caption2>
        <p>You may choose to restrict sharing or use of your personal information in the following ways:</p>
        <ul>
          <li>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information from time-to-time about third parties which might be of interest to you, provided you express the same to us.</li>
        </ul>
      </div>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;