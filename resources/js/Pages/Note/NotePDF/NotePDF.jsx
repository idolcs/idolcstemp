import pdf from "../../../../../public/assets/201-4 Textbook Annotations.pdf";
// import { EmbedPDF } from "@simplepdf/react-embed-pdf";

const NotePDF = () => {
    return (
        <>
            <div
                style={{
                    background: "rgb(217,217,217)",
                    background:
                        "linear-gradient(12deg, rgba(217,217,217,0.1) 0%, rgba(0,212,255,0) 50%)",
                }}
                className="flex overflow-hidden border border-[#535353] rounded-lg mt-2 w-full min-h-[50em]"
            >
                <iframe
                    className="w-full min-h-full"
                    src={pdf}
                    frameborder="0"
                ></iframe>
            </div>
            <div className='mt-4'>
                <a
                style={{
                    background: "rgb(217,217,217)",
                    background:
                        "linear-gradient(12deg, rgba(20,225,0,0.1) 0%, rgba(0,212,255,0) 50%)",
                }}
                className=" text-[#86A800] block p-3 border border-[#224D00] rounded-lg mt-2"
                
                href={pdf} download>Download the PDF</a>
            </div>
        </>
    );
};

export default NotePDF;