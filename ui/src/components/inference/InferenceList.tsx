'use client';

import Link from 'next/link';
import React, { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Badge } from 'flowbite-react';

import { Inference, initialPaginatedState } from '@/interfaces/inference.interface';
import { PaginatedItem } from '@/interfaces/item.interface';
import { formatDate } from '@/utils/date';

import { getInferenceAction } from './action';
import { DECISION_STYLES } from './style';

const InferenceContent: React.FC = () => {
  const { data } = useSuspenseQuery<PaginatedItem<Inference>>({
    queryKey: ['inferences'],
    queryFn: () => getInferenceAction(),
    initialData: initialPaginatedState,
    staleTime: 0,
  });

  return <ul>{data.items?.map((item: Inference) => <InferenceItem key={item.id} {...item} />)}</ul>;
};

const InferenceItem: React.FC<Inference> = (item: Inference) => {
  return (
    <Link href={`/inferences/${item.id}`}>
      <li className='rounded-xl hover:bg-gray-50'>
        <div className='flex gap-4 min-h-16'>
          <div className='min-w-24'>
            <p>{formatDate(new Date(item.createdAt))}</p>
          </div>
          <div className='flex flex-col items-center'>
            <div className={`rounded-full ${DECISION_STYLES[item.decision].dotStyle} p-1.5 w-fit`}></div>
            <div className='h-full w-px bg-border'></div>
          </div>
          <div className='flex gap-4'>
            <p className='text-dark text-start'>
              <Badge className={DECISION_STYLES[item.decision].badgeStyle}>{item.decision}</Badge>
            </p>
            <p>{item.rate * 100}%</p>
          </div>
        </div>
      </li>
    </Link>
  );
};

const InferenceSkeleton: React.FC = () => {
  return (
    <ul>
      <li>로딩 중...</li>
    </ul>
  );
};

const InferenceList: React.FC = () => {
  return (
    <div className='rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full min-h-full break-words'>
      <h5 className='card-title mb-6'>추론 목록</h5>
      <div className='flex flex-col mt-2'>
        <Suspense fallback={<InferenceSkeleton />}>
          <InferenceContent />
        </Suspense>
      </div>
    </div>
  );
};

export default InferenceList;
