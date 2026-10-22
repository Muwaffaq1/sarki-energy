import type * as React from 'react';

export interface IconProps { name: string; size?: 16 | 20 | 24 | 32 | 48 | number; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: string;
  iconRight?: string;
  loading?: boolean;
  fullWidth?: boolean;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  variant?: 'accent' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export declare function IconButton(props: IconButtonProps): React.ReactElement;

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  iconLeft?: string;
  suffix?: React.ReactNode;
}
export declare function Input(props: InputProps): React.ReactElement;

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): React.ReactElement;

export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}
export declare function Switch(props: SwitchProps): React.ReactElement;

export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'inverse' | 'success' | 'warning' | 'danger' | 'info';
  dot?: boolean;
  icon?: string;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface PriceProps {
  amount: number;
  compareAt?: number;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
}
export declare function Price(props: PriceProps): React.ReactElement;

export interface LogoProps { size?: number; tone?: 'default' | 'inverse' | 'on-photo'; label?: string; className?: string }
export declare function Logo(props: LogoProps): React.ReactElement;

export interface FormFieldProps {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  id?: string;
  children: React.ReactElement;
}
export declare function FormField(props: FormFieldProps): React.ReactElement;

export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
  label?: string;
}
export declare function QuantityStepper(props: QuantityStepperProps): React.ReactElement;

export interface SegmentedControlProps {
  options: Array<string | { value: string; label: React.ReactNode }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  fullWidth?: boolean;
}
export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;

export interface StatTileProps {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'flat';
  delta?: string;
  upIsGood?: boolean;
  caption?: React.ReactNode;
}
export declare function StatTile(props: StatTileProps): React.ReactElement;

export interface ProductCardProps {
  name: string;
  price: number;
  compareAt?: number;
  category?: string;
  spec?: string;
  image?: string;
  imageAlt?: string;
  icon?: string;
  badge?: { label: string; tone?: 'accent' | 'inverse' | 'success' };
  stock?: 'in' | 'low' | 'out';
  onAdd?: () => void;
  onNotify?: () => void;
}
export declare function ProductCard(props: ProductCardProps): React.ReactElement;

export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
  linkLabel?: string;
}
export declare function ServiceCard(props: ServiceCardProps): React.ReactElement;

export interface OrderSummaryProps {
  items: Array<{ name: string; amount: number; qty?: number }>;
  delivery?: number;
  discount?: number;
  vatRate?: number;
  title?: string;
  ctaLabel?: string;
  note?: React.ReactNode;
  onCheckout?: () => void;
}
export declare function OrderSummary(props: OrderSummaryProps): React.ReactElement;

export interface StationCardProps {
  kind: 'fuel' | 'ev';
  name: string;
  status?: 'open' | 'busy' | 'closed' | 'maintenance';
  distance?: string;
  address?: string;
  products?: Array<{ label: string; price: number; unit?: string }>;
  chargers?: { available: number; total: number; power: string; price?: number };
  onDirections?: () => void;
  onPrimary?: () => void;
}
export declare function StationCard(props: StationCardProps): React.ReactElement;

export interface UsagePanelProps {
  title: string;
  total: React.ReactNode;
  unit?: string;
  data: Array<{ label: string; value: number }>;
  series?: 'solar' | 'battery' | 'grid' | 'fuel';
  periods?: string[];
  period?: string;
  defaultPeriod?: string;
  onPeriodChange?: (period: string) => void;
  highlight?: number;
}
export declare function UsagePanel(props: UsagePanelProps): React.ReactElement;

export interface SiteHeaderProps {
  logoSrc?: string;
  name?: string;
  homeHref?: string;
  links?: Array<{ label: string; href?: string; current?: boolean }>;
  cartCount?: number;
  ctaLabel?: string;
}
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

export declare function formatNaira(amount: number): string;

declare global {
  interface Window {
    Sarki: {
      Icon: typeof Icon;
      Button: typeof Button;
      IconButton: typeof IconButton;
      Input: typeof Input;
      Checkbox: typeof Checkbox;
      Switch: typeof Switch;
      Badge: typeof Badge;
      Price: typeof Price;
      Logo: typeof Logo;
      FormField: typeof FormField;
      QuantityStepper: typeof QuantityStepper;
      SegmentedControl: typeof SegmentedControl;
      StatTile: typeof StatTile;
      ProductCard: typeof ProductCard;
      ServiceCard: typeof ServiceCard;
      OrderSummary: typeof OrderSummary;
      StationCard: typeof StationCard;
      UsagePanel: typeof UsagePanel;
      SiteHeader: typeof SiteHeader;
      formatNaira: typeof formatNaira;
      icons: string[];
    };
  }
}
