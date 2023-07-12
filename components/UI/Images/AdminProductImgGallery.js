// react / next
import Image from 'next/image';
// styles
import classes from './AdminProductImgGallery.module.css';

function AdminProductImgGallery(props) {
  const { images } = props;
  return (
    <div className={classes['box-0']}>
      {images.map((img) => (
        <Image
          key={img._id}
          src={img.url}
          alt="chronos logo"
          width={150}
          height={150}
          // priority
          // fill={true}
          // style={{ objectFit: 'cover' }}
        />
      ))}
    </div>
  );
}

export default AdminProductImgGallery;
