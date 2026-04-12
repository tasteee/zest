type TasteinkLogoPropsT = {
  scale?: number;
};

export const TasteinkLogo = (props: TasteinkLogoPropsT) => {
  const scale = (props.scale ?? 1) * 2;
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "left center",
        lineHeight: 1,
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      <span
        className="text-muted-foreground font-thin"
        style={{ letterSpacing: "-0.124em" }}
      >
        taste
      </span>
      <span
        className="text-primary font-black"
        style={{ letterSpacing: "-0.124em", marginLeft: "-0.0124em" }}
      >
        ink
      </span>
    </div>
  );
};
