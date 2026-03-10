interface Props {
  tag: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
}

export default function SectionHeader({ tag, title, titleHighlight, subtitle }: Props) {
  return (
    <div className="text-center mb-16">
      <span className="text-xs font-bold text-accent tracking-[2px] uppercase block mb-2">{tag}</span>
      <h2 className="text-[2.4rem] font-bold text-foreground mb-3 leading-tight">
        {title} <span className="gradient-text">{titleHighlight}</span>
      </h2>
      <p className="text-[1.05rem] text-muted-foreground max-w-[580px] mx-auto">{subtitle}</p>
    </div>
  );
}
