// react / next
import { useEffect, useState } from 'react';
import Image from 'next/image';
// components
import AdminRoute from '../../../components/Routes/AdminRoute';
import TextInput from '../../../components/UI/Form/TextInput';
import BtnCTA from '../../../components/UI/BtnCTA';
// libs
import axios from 'axios';
import SpinningLoader from '../../../components/UI/SpinningLoader';
import { useRouter } from 'next/router';

function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [nameIT, setNameIT] = useState('');
  const [nameEN, setNameEN] = useState('');
  const [nameDE, setNameDE] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageIDs, setImageIDs] = useState([]);
  const [imagesURLs, setImagesURLs] = useState([]);

  //   validation
  const [nameITTouched, setNameITTouched] = useState(false);
  const nameITIsValid = nameIT.trim() !== '' && nameIT.length > 4;
  const nameITIsInvalid = !nameITIsValid && nameITTouched;

  const [nameENTouched, setNameENTouched] = useState(false);
  const nameENIsValid = nameEN.trim() !== '' && nameEN.length > 4;
  const nameENIsInvalid = !nameENIsValid && nameENTouched;

  const [nameDETouched, setNameDETouched] = useState(false);
  const nameDEIsValid = nameDE.trim() !== '' && nameDE.length > 4;
  const nameDEIsInvalid = !nameDEIsValid && nameDETouched;

  let formIsValid;
  formIsValid = nameITIsValid && nameENIsValid && nameDEIsValid;

  const fetchImagesURLs = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/products/images-url`,
        { imageIDs }
      );
      if (res.data.success) {
        setImagesURLs(res.data.urls);
        // console.log(res.data);
      }
    } catch (err) {
      console.log();
    }
    setLoading(false);
  };

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
    setLoading(true);
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

      if (res.data.success) {
        console.log(res.data.img);
        setImageIDs((prev) => [...prev, res.data.img._id]);
        // setImageID(res.data.img._id);
        // console.log(res.data);
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  console.log(imagesURLs);

  const createNewProduct = async () => {
    setNameITTouched(true);
    setNameENTouched(true);
    setNameDETouched(true);
    if (formIsValid) {
      setLoading(true);
      try {
        const newProduct = {
          nameIT,
          nameEN,
          nameDE,
          images: imageIDs,
        };
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/products/new`,
          newProduct
        );

        if (res.data.success) {
          router.push('/admin/prodotti');
        } else {
          console.log('ERRORE NEL CREARE NUOVO PRODOTTO');
          const newProductError = (
            <>
              <h1>ERRORE NELLA CREAZIONE DEL NUOVO PRODOTTO</h1>
              <br></br>
              <h2
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => setError('')}
              >
                Riprova
              </h2>
            </>
          );
          setError(newProductError);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageIDs && imageIDs.length > 0) fetchImagesURLs();
  }, [imageIDs]);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : error.length > 0 ? (
        error
      ) : (
        <>
          <h1>NUOVO PRODOTTO</h1>
          <TextInput
            type="text"
            label="Nome ITA"
            required={true}
            name="nameIT"
            placeholder="Nome Italiano"
            onChange={(e) => {
              setNameIT(e.target.value);
            }}
            onBlur={() => setNameITTouched(true)}
            isInvalid={nameITIsInvalid}
            errorMsg={'inserire un nome valido'}
          />
          <TextInput
            type="text"
            label="Nome EN"
            required={true}
            name="nameEN"
            placeholder="Nome Inglese"
            onChange={(e) => {
              setNameEN(e.target.value);
            }}
            onBlur={() => setNameENTouched(true)}
            isInvalid={nameENIsInvalid}
            errorMsg={'inserire un nome valido'}
          />
          <TextInput
            type="text"
            label="Nome DE"
            required={true}
            name="nameDE"
            placeholder="Nome Tedesco"
            onChange={(e) => {
              setNameDE(e.target.value);
            }}
            onBlur={() => setNameDETouched(true)}
            isInvalid={nameDEIsInvalid}
            errorMsg={'inserire un nome valido'}
          />
          <div>
            <input
              type="file"
              name="img-upload"
              //   multiple
              onChange={(e) => handleImage(e)}
            />
            <button onClick={handleFileUpload}>UPLOAD</button>
          </div>
          <br></br>
          <div>
            <BtnCTA
              label="Crea Nuovo Prodotto"
              onClickAction={createNewProduct}
            />
          </div>
          {imagesURLs &&
            imagesURLs.map((img) => (
              <div key={img._id} style={{ width: '30rem' }}>
                <Image
                  src={img.url}
                  //   style={{ width: '30rem' }}
                  alt="new product image"
                  width={320}
                  height={220}
                  //   //   fill={true}
                  //   style={{ objectFit: 'cover' }}
                  //   sizes="(max-width: 768px) 12rem,
                  // (max-width: 1200px) 12rem,
                  // 12rem"
                />
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default NewProductPage;
