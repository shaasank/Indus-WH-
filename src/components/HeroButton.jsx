import { Link } from 'react-router-dom';

export default function HeroButton({
  to,
  variant = 'solid', // 'solid' (red) | 'outline' (white with grey border) | 'white' (white with red text)
  children,
  icon: Icon = null,
  className = '',
}) {
  const baseStyles =
    'w-full md:w-auto md:min-w-[220px] h-[52px] px-8 inline-flex items-center justify-center gap-3 font-heading font-light text-sm uppercase tracking-[0.18em] transition-all duration-300 select-none';

  let variantStyles = '';
  if (variant === 'solid') {
    variantStyles = 'bg-accent text-white border border-accent hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/20 active:translate-y-0';
  } else if (variant === 'outline') {
    variantStyles = 'bg-white text-primary border border-muted/30 hover:bg-muted hover:text-white active:translate-y-0';
  } else if (variant === 'white') {
    variantStyles = 'bg-white text-accent border border-white hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0';
  }

  return (
    <Link to={to} className={`${baseStyles} ${variantStyles} ${className}`}>
      <span>{children}</span>
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
    </Link>
  );
}
