import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGetBeerByIdQuery } from '@/app/store/api/apiSlice';
import styles from './SingleBeerScreen.module.scss';
import Image from 'next/image';

export default function SingleBeerScreen(): JSX.Element {
  const router = useRouter();
  const { beerId } = router.query;

  const { data, isLoading } = useGetBeerByIdQuery(beerId as string);
  const [beer] = data || [];

  if (isLoading) {
    return <h2 className="heading">Loading...</h2>;
  }
  if (!beer) {
    return <h2 className="heading">no beer found </h2>;
  }
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{beer?.name || 'Punk API - Beers'}</title>
      </Head>
      <div className={styles.card}>
        <Image
          src={beer?.image_url || '/assets/no_image.png'}
          width={400}
          height={900}
          className={styles.image}
          alt=""
        />
        <div className={styles.content}>
          <h2>{beer?.name}</h2>
          <p className={styles.tagline}> {beer.tagline}</p>
          <p className={styles.description}>{beer?.description}</p>
          <p>
            <strong>ABV</strong> is {beer.abv}
          </p>
          <p>This beer tastes good with the following foods</p>
          <ul className={styles.food}>
            {beer.food_pairing.map((food, index) => (
              <li key={`food_pairing_${index}`}>{food}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
