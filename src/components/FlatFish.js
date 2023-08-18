export default function FlatFish({color}) {
    return (
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            {/* <!-- Fish body --> */}
            <ellipse cx="150" cy="100" rx="120" ry="70" fill={color} />

            {/* <!-- Fish eye --> */}
            <circle cx="180" cy="80" r="10" fill="white" />
            <circle cx="180" cy="80" r="5" fill="black" />

            {/* <!-- Fish tail --> */}
            <polygon points="30,100 80,30 80,170" fill="skyblue" />

            {/* <!-- Fish fins --> */}
            <path d="M 150 30 Q 120 50 150 80" fill="skyblue" />
            <path d="M 150 170 Q 120 150 150 140" fill="skyblue" />

        </svg>

    )
}