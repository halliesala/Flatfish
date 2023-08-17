export default function MessageWindow({ messages, clearMessages }) {
    return (
        <div className="messageDiv">
            <h2>Messages</h2>
            <button onClick={clearMessages}>Clear Message Console</button>
            {messages.map((message, idx) => {
                return (
                    <p key={idx}>{message.text}</p>
                )
            })}
        </div>
    )
}