import React, { useState } from 'react';
import { Button, Image, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

interface AdminAddimageProps {
    onImageSelect: (file: File) => void;
}

const AdminAddimage: React.FC<AdminAddimageProps> = ({ onImageSelect }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleUpload = (file: File) => {
        onImageSelect(file);
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setSelectedImage(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <Upload
            name="image"
            listType="picture-card"
            maxCount={1}
            showUploadList={false}
            customRequest={({ file }: File | any) => handleUpload(file)}
        >
            {selectedImage ? <Image src={selectedImage} alt="image" className="W-full" preview={false} /> : (
                <div>
                    <PlusOutlined />
                    <div className=' mt-10'>Upload</div>
                </div>
            )}
        </Upload>
    );
};

export default AdminAddimage;



