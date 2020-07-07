import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p><strong>Gatsby x Shopify</strong> by <a className="has-text-danger" href="https://www.alexislepresle.com" target="_blank" rel="noopener noreferrer">Alexis Lepresle</a> (Fake store with <a className="has-text-danger" target="_blank" rel="noopener noreferrer" href="https://www.shop.dev.to">Dev.to</a> products)</p>
                <a className="button is-dark" style={{ marginRight: "10px" }} target="_blank" rel="noopener noreferrer" href="https://github.com/alexislepresle/Gatsby-E-commerce-course">Github</a>
                <a className="button is-dark" target="_blank" rel="noopener noreferrer" href="https://school.alexislepresle.com/courses/build-an-ecommerce-website-with-gatsby-js-1/">Online Course</a>
            </div>
        </footer>
    );
};

export default Footer;