import React from 'react';

const MamaearthUI = () => {
    // Data array for easy content management
    const contentSections = [
        {
            id: 1,
            title: "Get your hands on Nature-Inspired Mamaearth Products ",
            paragraphs: [
                `Mamaearth offers the best-in-class skincare products to help you discover the essence of beauty with the Goodness of Nature. We are also Asia’s first brand to be accoladed with Made Safe Certification for our beauty products.Mamaearth Sale B1G1 is live on top-selling skin & haircare. Natural, toxin-free &Made Safe certified. Loved by millions for real results. Order now! We work with skincare experts to make the best natural for men and women to offer you the best skincare experience. Mamaearth is the one of the most trustworthy brands in India.

            We are a brand by the parents and for the parents because we offer safe and gentle baby skin care products through world-class research to solve every little problem of parents. To make skincare,
haircare, body-care and baby-care products that are especially mum-friendly, we curate our toxin-free, harmful chemical-free, paraben-free products with utmost care and precision.

Mamaearth biggest B1G1 Sale live Now! on top-selling skin & haircare. Natural, toxin-free & Made Safe certified.
Loved by millions for real results. Order now! Explore  Explore and choose from an array of products for your beauty care regimen. Mamaearth online shopping store offers you complete convenience. You can view your favorite picks in one place on the Mamaearth website. Our user-friendly interface will guide you through the product information to make the best buying decisions. Buy now!

Get extra 5% OFF on prepaid orders up to ₹50 at Mamaearth. Choose any online payment method at checkout and enjoy instant savings on your favorite natural beauty products!

Our Founder Details - , `
            ]
        },
        {
            id: 2,
            title: "Download Mamaearth App for iOS and Android today!", // No specific title for this section
            paragraphs: [
                "We are a brand by the parents and for the parents because we offer safe and gentle baby skin care products through world-class research to solve every little problem of parents.",
                "To make skincare, haircare, body-care and baby-care products that are especially mum-friendly, we curate our toxin-free, harmful chemical-free, paraben-free products with utmost care and precision."
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-8 font-sans text-gray-800 leading-relaxed bg-[ #F8F8F8] ">
            {/* Dynamic Content Sections */}
            {contentSections.map((section) => (
                <section key={section.id} className="mb-8">
                    {section.title && (
                        <h1 className="text-3xl font-bold mb-6 text-black">
                            {section.title}
                        </h1>
                    )}
                    {section.paragraphs.map((text, idx) => (
                        <p key={idx} className="mb-4 text-sm md:text-base">
                            {text}
                        </p>
                    ))}
                </section>
            ))}

            {/* Static Promotion Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
                <p className="font-semibold text-blue-600 mb-2">Mamaearth biggest B1G1 Sale live Now!</p>
                <p className="text-sm">Get extra 5% OFF on prepaid orders up to ₹50 at Mamaearth.</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Footer Info */}
            <div className="mb-12">
                <p className="text-sm font-medium">
                    Our Founder Details - <span className="text-gray-400">Varun Alagh, Ghazal Alagh</span>
                </p>
            </div>

            {/* App Download Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Download Mamaearth App for iOS and Android today!</h2>
                <p className="text-sm text-gray-600">
                    We welcome you to download our all-new Mamaearth app for your iPhone or Android smartphone.
                </p>
            </div>
        </div>
    );
};

export default MamaearthUI;