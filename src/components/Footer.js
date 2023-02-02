import React from "react";
import "./Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <div className="footer__logo">
          <a href="http://www.larsentoubro.com/" target="_blank">
            <img
              src="https://www.ltimindtree.com/wp-content/themes/LnTInfotech/images/parent-company-logo.png"
              alt=""
            />
          </a>
        </div>
        <div className="footer__icons">
          <div className="icons">
            <a
              href="https://www.linkedin.com/company/ltimindtree/"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a href="https://twitter.com/LTIMindtreeOFCL" target="_blank">
              <TwitterIcon />
            </a>
            <a
              href="https://www.youtube.com/channel/UCZsS5innU-V3y-Z6sw2fSfQ"
              target="_blank"
            >
              <YouTubeIcon />
            </a>
            <a href="https://www.facebook.com/LTIMindtree" target="_blank">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/ltimindtree/" target="_blank">
              <InstagramIcon />
            </a>
            <a href="https://www.ltimindtree.com/contact-us/" target="_blank">
              <EmailOutlinedIcon />
            </a>
          </div>
        </div>
        <div className="footer__menu">
          <a href="https://www.ltimindtree.com/blogs/">Blogs</a>
          <a href="https://www.ltimindtree.com/careers/">Careers</a>
          <a href="https://www.ltimindtree.com/about-us/">Company</a>
          <a href="https://www.ltimindtree.com/investors/">Investors</a>
          <a href="https://www.ltimindtree.com/newsletters/">Newsletter</a>
        </div>
      </div>
      <div className="footer__center">
        <p className="footer__body">
          <a href="https://www.ltimindtree.com/" target="_blank">
            LTIMindtree
          </a>{" "}
          is a global technology consulting and digital solutions company that
          enables enterprises across industries to reimagine business models,
          accelerate innovation, and maximize growth by harnessing digital
          technologies. As a digital transformation partner to more than 750
          clients, LTIMindtree brings extensive domain and technology expertise
          to help drive superior competitive differentiation, customer
          experiences, and business outcomes in a converging world. Powered by
          nearly 90,000 talented and entrepreneurial professionals across more
          than 30 countries, LTIMindtree a Larsen & Toubro Group company
          combines the industry-acclaimed strengths of erstwhile Larsen and
          Toubro Infotech and Mindtree in solving the most complex business
          challenges and delivering transformation at scale. For more
          information, please visit{" "}
          <a href="https://www.ltimindtree.com/" target="_blank">
            www.ltimindtree.com
          </a>
          .
        </p>
      </div>
      <div className="footer__bottom">
        <span className="footer__bottom__left">
          &copy; 2023 LTIMindtree. All rights reserved.
        </span>
        <div className="footer__bottom__right">
          <a href="https://www.ltimindtree.com/accessibility/">Accessibility</a>
          <a href="https://www.ltimindtree.com/sitemap/">Site Map</a>
          <a href="https://www.ltimindtree.com/lti-california-privacy-policy/#privacy-data">
            Do not sell my personal information
          </a>
          <a href="https://www.ltimindtree.com/general-privacy-policy/">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
