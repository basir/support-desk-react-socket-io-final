import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import socketIOClient from "socket.io-client";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;
export default function ChatBox() {
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    { from: "System", body: "Hello there, Please ask your question." },
  ]);
  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", { name: userName });
      socket.on("message", (data) => {
        console.log(messages);
        setMessages([...messages, data]);
      });
    }
  }, [messages, isOpen, socket, userName]);

  const supportHandler = () => {
    setIsOpen(true);
    // setUserName("Joe");
    if (!userName) {
      setUserName(prompt("Please enter your name"));
    }
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, from: userName, to: "Admin" },
      ]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          from: userName,
          to: "Admin",
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="chatbox">
      {!isOpen ? (
        <Button onClick={supportHandler} variant="primary">
          Chat with us
        </Button>
      ) : (
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <strong>Support </strong>
              </Col>
              <Col className="text-end">
                <Button
                  className="btn-sm btn-secondary"
                  type="button"
                  onClick={closeHandler}
                >
                  x
                </Button>
              </Col>
            </Row>
            <hr />
            <ListGroup ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <ListGroup.Item key={index}>
                  <strong>{`${msg.from}: `}</strong> {msg.body}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <form onSubmit={submitHandler}>
              <InputGroup className="col-6">
                <FormControl
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type="text"
                  placeholder="type message"
                />
                <Button type="submit" variant="primary">
                  Send
                </Button>
              </InputGroup>
            </form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
