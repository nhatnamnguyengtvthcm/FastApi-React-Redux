/* eslint-disable jsx-a11y/alt-text */
import { Label } from '@mui/icons-material';
import { InputLabel } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { string } from 'yup';
import carBrandApi from '../../api/carBrandApi';

export interface FileProps{
  // carBrandId: number
  logo_url?: string
  onSendFile: (file:File)=>void;
}

function FileField({logo_url, onSendFile}:FileProps) {
  const [file, setFile] = useState<File>();
  const [imgPath, setImgPath] = useState('');
  // const [isChangeFile, isChangeFile] = useState(false);
  var img_path='';
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      onSendFile(e.target.files[0]);
      console.log(e.target.files[0]);
      // const reader = new FileReader();
      const url = URL.createObjectURL(e.target.files[0]);
      setImgPath(url);
    }
  };
  // if(file){
  //   const url:string = `http://127.0.0.1:8000/${file?.name}?w=80&h=80&fit=crop&auto=format`
  // }
  var reader = new FileReader();
  

  const url:string = imgPath? `${imgPath}?w=80&h=80&fit=crop&auto=format`:`${logo_url}?w=80&h=80&fit=crop&auto=format`;
  const src_url:string = imgPath? `${imgPath}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`:`${logo_url}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`;
  console.log("img:", imgPath);
  console.log("url:", src_url);
  // useEffect(()=>{
  //   handleUploadClick(carBrandId);
  //   // isChangeFile(true);
  // }, [carBrandId]);
  // const handleUploadClick = (carBrandId:number) => {
  //   if (!file) 
  //   {
  //     return;
  //   };
  //   };
    
    // 👇 Uploading the file using the fetch API to the server
    // fetch('https://httpbin.org/post', {
    //   method: 'POST',
    //   body: file,
    //   // 👇 Set headers manually for single file upload
    //   headers: {
    //     // 'content-type': file.type,
    //     'content-length': `${file.size}`, // 👈 Headers need to be a string
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));

  return (
    <div>
      
      <input type="file" onChange={handleFileChange} />
      
      {/* {logo_url && <img
        src={`${logo_url}?w=80&h=80&fit=crop&auto=format`}
        srcSet={`${logo_url}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`}
        loading="lazy"
      />} */}
      {logo_url && <img
        src={url}
        srcSet={src_url}
        loading="lazy"
      />}
      <div>{file && `${file.name} - ${file.type}`}</div>
     
      {/* <button onClick={handleUploadClick}>Upload</button> */}
    </div>
  );
}

export default FileField;