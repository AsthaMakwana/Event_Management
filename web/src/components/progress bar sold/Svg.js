function GradientSVG() {
    const idCSS = "hello";
    const gradientTransform = `rotate(90)`;
    return (
        <svg style={{ height: 0 }}>
            <defs>
                <linearGradient id={idCSS} gradientTransform={gradientTransform}>
                    <stop offset="20.00%" stopColor="#ff512f" />
                    <stop offset="50.00%" stopColor="#dd2476" />
                    {/* <stop offset="75.00%" stopColor="#ff9co3" /> */}
                </linearGradient>
            </defs>
        </svg>
    );
}

export default GradientSVG;