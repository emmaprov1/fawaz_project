import Link from 'next/link';
import { FC, memo, MouseEventHandler } from 'react';

export enum btnType {
  Link,
  Btn
}

interface Btn {
  type: btnType;
  title: string;
  href?: string;
  addStyle?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Btn> = ({
  type,
  title,
  href,
  addStyle,
  disabled,
  onClick
}) => {
  const styles = ['button', addStyle].join(' ');

  if (type === btnType.Link) {
    return (
      <Link href={href}>
        <a className={styles}>{title}</a>
      </Link>
    );
  }
  return (
    <button className={styles} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};

export default memo(Button);
