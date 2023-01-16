import React from 'react';
import Link from 'next/link';
import { BeerModel } from '@/app/models/BeerModel';
import styles from './BeerItem.module.scss';
import Image from 'next/image';
import shortenString from '@/app/helpers/shortenString';

interface BeerItemProps {
  beer: BeerModel;
}

export default function BeerItem({ beer }: BeerItemProps): JSX.Element {
  return (
    <Link href={`beer/${beer.id}`}>
      <div className={styles.wrapper}>
        <Image
          src={beer.image_url || '/assets/no_image.png'}
          width={320}
          height={180}
          className={styles.image}
          alt=""
        />
        <div>
          <h3 className={styles.title}>{beer.name}</h3>
          <p>{shortenString(beer.description)}</p>
        </div>
      </div>
    </Link>
  );
}
