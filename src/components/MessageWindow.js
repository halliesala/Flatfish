export default function MessageWindow({ messages, clearMessages }) {
    return (
        <div className="message-div">
            <h2>Messages</h2>
            <button onClick={clearMessages}>Clear Message Console</button>
            {messages.map((message, idx) => {
                return (
                    <div key={idx}>
                        <span className="timestamp">{formatTimestamp(message.timestamp)}: </span>
                        <span className="message-text">{message.text}</span>
                    </div>
                )
            })}
        </div>
    )

    function formatTimestamp(someDate) {
        return someDate?.toLocaleDateString('en-us', { hour: "numeric", minute: "numeric", second: "numeric"})
    }
}