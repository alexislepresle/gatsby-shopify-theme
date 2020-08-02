import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" style={{padding: "3rem 1.5rem 2rem"}}>
            <div className="content has-text-centered">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <p>© 2020 - Gatsby x Shopify by <a className="has-text-danger-dark" href="https://www.alexislepresle.com" target="_blank" rel="noopener noreferrer">Alexis Lepresle</a></p>
                        </div>
                        <p className="level-item">
                            <p>(Fake store with <a className="has-text-danger-dark" target="_blank" rel="noopener noreferrer" href="https://www.shop.dev.to">Dev.to</a> products)</p>
                        </p>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <a className="button is-dark" style={{ marginRight: "10px" }} target="_blank" rel="noopener noreferrer" href="https://github.com/alexislepresle/Gatsby-E-commerce-course">Github</a>
                        </div>
                        <div className="level-item">
                            <a className="button is-dark" target="_blank" rel="noopener noreferrer" href="https://school.alexislepresle.com/courses/build-an-ecommerce-website-with-gatsby-js/">Online Course</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;