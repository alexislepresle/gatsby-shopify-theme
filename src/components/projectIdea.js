import React from 'react';
import Img from 'gatsby-image';

const ProjectIdea = ({img}) => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns is-centered">
                        <div className="column is-8">
                            <h1 className="title is-2">
                                Do you also have an idea for a project with Gatsby and Shopify?
                            </h1>
                            <br/>
                            <div className="columns is-centered is-vcentered">
                                <div className="column is-8">
                                    <h2 className="subtitle has-text-left">
                                        If you want to know why you should build your next online store with Gatsby and Shopify: I talk about it on my blog: 
                                        <a className="has-text-danger-dark" href="https://alexislepresle.com/blog/why-building-an-e-commerce-website-with-gatsby-js-and-shopify/" target="_blank" rel="noopener noreferrer">Why building an e-commerce website with Shopify and Gatsby JS ?</a>
                                    </h2>
                                    <br/>
                                    <a className="button is-rounded is-danger-dark" href="https://alexislepresle.com/contact">Contact me</a>
                                </div>
                                <div className="column is-8">
                                    <Img fluid={img} alt="project" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectIdea;