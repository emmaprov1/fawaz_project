import { FC } from 'react';

interface LABEL {
  labelId: string;
  labelTitle: string;
  labelInst?: string;
}

const Label: FC<LABEL> = ({ labelId, labelTitle, labelInst }) => {
  return (
    <label htmlFor={labelId}>
      <span>
        {labelTitle}{' '}
        {labelInst && <span style={{ color: '#33333334' }}>{labelInst}</span>}
      </span>
      <svg>
        <use xlinkHref="/images/icons/icons.svg#icon-option" />
      </svg>
    </label>
  );
};

export default Label;
