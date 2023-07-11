import { useEffect, useState } from 'react';
// libs
import axios from 'axios';

function upload() {
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/products/list-files`
      );
      console.log(res);
      if (res.data.success) setFileList(res.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // console.log(file);
    // let formData = new FormData();
    // formData.append('test-file', file);
    // setFileUpload([...formData]);
  };

  //   console.log(fileList);

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('test-file', selectedFile);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/products/file-upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.success) fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/products/download/${fileName}`,
        {
          responseType: 'blob',
        }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      //   console.log(res);
      //   const url = window.URL.createObjectURL(new Blob([res.data.url]));
      //   const url = res.data.url;
      const url = window.URL.createObjectURL(blob);
      //   console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="file"
        name="medrone-file"
        //   multiple
        onChange={(e) => handleImage(e)}
      />
      <button onClick={handleFileUpload}>UPLOAD</button>
      <br></br>
      {fileList &&
        fileList.map((file) => (
          <div key={file._id}>
            <img
              className="rounded"
              width="430"
              height="768"
              src={file.url}
            ></img>
          </div>
          //   <div key={file.ETag} onClick={() => handleDownload(file.Key)}>
          //     {file.Key}
          //   </div>
        ))}
    </>
    // <form action="/profile" method="post" encType="multipart/form-data">

    // </form>
  );
}

export default upload;
