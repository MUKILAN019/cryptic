import React, { useState, useRef } from "react";
import logo from "../assets/logo.png";

const Home: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [encodedImage, setEncodedImage] = useState<string | null>(null);
    const [decodedMessage, setDecodedMessage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvasRef.current = canvas;
        };
    };

    const encodeMessage = () => {
        if (!canvasRef.current || !message) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert message to binary
        let binaryMessage = "";
        for (let i = 0; i < message.length; i++) {
            binaryMessage += message[i].charCodeAt(0).toString(2).padStart(8, "0");
        }

        binaryMessage += "00000000"; // Add delimiter (null character)

        if (binaryMessage.length > data.length / 4) {
            alert("❌ Message too long for this image.");
            return;
        }

        // Modify the image pixels' least significant bits
        for (let i = 0; i < binaryMessage.length; i++) {
            data[i * 4] = (data[i * 4] & 0xfe) | parseInt(binaryMessage[i]); // Modify Red channel LSB
        }

        ctx.putImageData(imageData, 0, 0);
        setEncodedImage(canvas.toDataURL()); // Convert modified image to Data URL
    };

    const decodeMessage = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let binaryMessage = "";
        for (let i = 0; i < data.length / 4; i++) {
            binaryMessage += (data[i * 4] & 1).toString(); // Extract LSB from Red channel
        }

        let decodedText = "";
        for (let i = 0; i < binaryMessage.length; i += 8) {
            const char = String.fromCharCode(parseInt(binaryMessage.slice(i, i + 8), 2));
            if (char === "\0") break; // Stop at null character
            decodedText += char;
        }

        setDecodedMessage(decodedText);
    };

    return (
        <div className="w-full h-screen flex flex-col items-center">
            {/* Logo Section */}
            <div className="flex justify-center m-6">
                <img src={logo} alt="Logo" className="w-32 sm:w-40 md:w-56" />
            </div>

            {/* Encoding & Decoding Section */}
            <div className="grid gap-14 sm:gap-12 md:gap-16 lg:gap-24 mt-6 md:grid-cols-2 place-items-center">
                {/* Encoding Box */}
                <div className="grid gap-4 text-center md:text-left">
                    <h1 className="font-bold text-xl sm:text-2xl">Encoding ➡️</h1>
                    <div className="grid sm:flex gap-4">
                        <input
                            type="text"
                            placeholder="Enter Message"
                            className="input input-info w-full sm:w-64"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <input type="file" className="file-input file-input-primary w-full sm:w-64" onChange={handleImageUpload} />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={encodeMessage}>Encode Message</button>
                    {encodedImage && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Encoded Image:</p>
                            <br/>
                            <div className="flex justify-center">
                            <img src={encodedImage} alt="Encoded" className="w-40 border rounded-lg" />
                            </div>
                            <br/>
                            <div className="flex justify-center">
                            <button className="btn btn-dash btn-success">
                                <a href={encodedImage} download="encoded-image.png" className="block mt-2 text-blue-500 underline">Download Image</a>
                            </button>
                            </div>   
                           
                        </div>
                    )}
                </div>

                {/* Decoding Box */}
                <div className="grid gap-4 text-center md:text-left">
                    <h1 className="font-bold text-xl sm:text-2xl">Decoding ➡️</h1>
                    <input type="file" className="file-input file-input-primary w-full sm:w-64" onChange={handleImageUpload} />
                    <button className="btn btn-primary mt-2" onClick={decodeMessage}>Decode Message</button>
                    {decodedMessage && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Decoded Message:</p>
                            <textarea
                                className="textarea textarea-info w-96 h-40 resize-none"
                                readOnly
                                value={decodedMessage}
                            ></textarea>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
