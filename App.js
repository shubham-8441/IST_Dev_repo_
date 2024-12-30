import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
    const [contentImage, setContentImage] = useState(null);
    const [styleImage, setStyleImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [loading, setLoading] = useState(false);

    const predefinedStyles = [
        "/Border_coolie.jpg",
        "/Dog_real.jpg",
        "/pixai-1829906549177911492.png",
        "/sketch-5622725_640.jpg",
    ];

    const newSectionRef = useRef(null); // Reference for the new section
    const [isSectionVisible, setIsSectionVisible] = useState(false); // State for visibility

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsSectionVisible(true); // Trigger animation when section is in view
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is visible
            }
        );
        if (newSectionRef.current) {
            observer.observe(newSectionRef.current);
        }

        return () => {
            if (newSectionRef.current) {
                observer.unobserve(newSectionRef.current); // Cleanup observer when component unmounts
            }
        };
    }, []);

    const handleContentChange = (e) => {
        setContentImage(URL.createObjectURL(e.target.files[0])); // Preview content image
    };

    const handleStyleChange = (e) => {
        setStyleImage(URL.createObjectURL(e.target.files[0])); // Preview style image
        setSelectedStyle(null); // Reset selected style when custom image is chosen
    };

    const handleStyleSelect = (style) => {
        setStyleImage(style); // Set predefined style image
        setSelectedStyle(style); // Highlight selected style
    };

    const handleUpload = async () => {
        if (!contentImage || !styleImage) return;

        setLoading(true); // Set loading state to true
        const formData = new FormData();
        formData.append("content", contentImage); // Image file, not URL
        formData.append("style", styleImage); // Image file, not URL

        try {
            const response = await axios.post("http://localhost:3001/upload", formData);
            setResultImage(`data:image/jpeg;base64,${response.data.image}`);
        } catch (error) {
            console.error("Error uploading images:", error);
        } finally {
            setLoading(false); // Set loading state to false after response or error
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">
                        Image Style Transfer
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active text-white" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Introductory Section */}
            <div className="intro-section py-5 text-white" style={{ background: "linear-gradient(135deg, #6f25be, #2977ff)" }}>
                <div className="container">
                    <div className="row align-items-center">
                        {/* Collage Section */}
                        <div className="col-md-6 d-flex justify-content-center">
                            <div className="position-relative" style={{ width: "100%", height: "300px" }}>
                                <img
                                    src="/Dog_real.jpg"
                                    alt="Content Example"
                                    className="rounded-circle position-absolute"
                                    style={{
                                        width: "155px",
                                        height: "155px",
                                        objectFit: "cover",
                                        top: "5%",
                                        left: "38%",
                                        zIndex: 2,
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                                    }}
                                />
                                <img
                                    src="/pixai-1829906549177911492.png"
                                    alt="Style Example"
                                    className="rounded-circle position-absolute"
                                    style={{
                                        width: "155px",
                                        height: "155px",
                                        objectFit: "cover",
                                        top: "5%",
                                        left: "15%",
                                        zIndex: 1,
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                                    }}
                                />
                                <img
                                    src="/Border_coolie.jpg"
                                    alt="Result Example"
                                    className="rounded-circle position-absolute"
                                    style={{
                                        width: "170px",
                                        height: "170px",
                                        objectFit: "cover",
                                        top: "42%",
                                        left: "24%",
                                        zIndex: 3,
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="col-md-6" style={{ textAlign: "justify" }}>
                            <h2>Welcome to Image Style Transfer!</h2>
                            <p>
                                Our tool lets you combine the beauty of one image's style with the content of another.
                                Whether you're looking to turn a photo into a painting or stylize your images for unique
                                visual effects, we’ve got you covered.
                            </p>
                            <p>
                                Simply upload your content image, select or upload a style image, and let our system create
                                stunning results in seconds!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mt-5">
                {/* Cards */}
                <div className="row text-center mb-4">
                    <div className="col-md-4 mb-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">Upload Content Image</h5>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control mb-3"
                                    onChange={handleContentChange}
                                />
                                {contentImage && (
                                    <div className="mt-3">
                                        <h6>Content Image Preview:</h6>
                                        <img
                                            src={contentImage}
                                            alt="Content Preview"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: "200px", objectFit: "cover" }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">Upload Style Image</h5>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control mb-3"
                                    onChange={handleStyleChange}
                                />
                                {styleImage && (
                                    <div className="mt-3">
                                        <h6>Style Image Preview:</h6>
                                        <img
                                            src={styleImage}
                                            alt="Style Preview"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: "200px", objectFit: "cover" }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">Styled Image</h5>
                                {resultImage ? (
                                    <img
                                        src={resultImage}
                                        alt="Styled Result"
                                        className="img-fluid rounded shadow"
                                        style={{ maxHeight: "200px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <p className="text-muted">No styled image yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggestive Styles Section */}
                <div className="mt-5">
                    <h3 className="text-center mb-4">Various Image Styles to choose from !</h3>
                    <div className="row d-flex justify-content-between">
                        {predefinedStyles.map((style, index) => (
                            <div className="col-md-3 mb-3" key={index}>
                                <img
                                    src={style}
                                    alt={`Style ${index + 1}`}
                                    className={`img-fluid rounded shadow ${selectedStyle === style ? "border border-primary" : ""}`}
                                    style={{
                                        cursor: "pointer",
                                        height: "200px",
                                        width: "100%",
                                        objectFit: "cover",
                                    }}
                                    onClick={() => handleStyleSelect(style)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Apply Style Button */}
                <div className="text-center mt-4">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleUpload}
                        disabled={!contentImage || !styleImage || loading}
                    >
                        {loading ? 'Processing...' : 'Apply Style'}
                    </button>
                </div>
            </div>

            {/* New Animated Section */}
            <div
                className={`new-section mt-5 ${isSectionVisible ? "visible" : ""}`}
                ref={newSectionRef}
                style={{
                    opacity: 0,
                    transform: "translateX(-100%)",
                    animation: isSectionVisible ? "slideInFromLeft 2s ease-out forwards" : "none",
                }}
            >
                <h3>This is the New Animated Section</h3>
                <p>Content that slides in when it comes into view...</p>
            </div>

            <style>
                {`
                @keyframes slideInFromLeft {
                    from {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .new-section.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
                `}
            </style>
        </div>
    );
}

export default App;
