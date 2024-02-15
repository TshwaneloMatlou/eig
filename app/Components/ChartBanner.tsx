import Image from 'next/image';

interface ChartBannerProps {
  imageUrl: string;
  altText: string;
}

const ChartBanner: React.FC<ChartBannerProps> = ({ imageUrl, altText }) => {
  return (
    <div className="banner-container">
      <Image src={imageUrl} alt={altText} layout="responsive" width={1920} height={400} className='my-5' />
    </div>
  );
};

export default ChartBanner;
