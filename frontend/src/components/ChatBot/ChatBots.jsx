// import style from './ChatBot.module.css'
// import React, { useState } from "react";
// import ChatBot from "react-simple-chatbot";
// import { Segment } from "semantic-ui-react";
// import { FaRobot, FaTimes } from "react-icons/fa";

// function ChatBots() {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleChatBot = () => {
//       setIsOpen(!isOpen);
//     };
  
//     const steps = [
//       {
//         id: 'Greet',
//         message: 'Hello, Welcome to our website',
//         trigger: 'Ask Name'
//       },
//       {
//         id: 'Ask Name',
//         message: 'What is your name?',
//         trigger: 'Name'
//       },
//       {
//         id: 'Name',
//         user: true,
//         trigger: 'AskPhoneNumber'
//       },
//       {
//         id: "AskPhoneNumber",
//         message: "Could you please provide your phone number?",
//         trigger: "Phone",
//       },
//       {
//         id: "Phone",
//         user: true,
//         trigger: "AskIssue",
//       },
//       {
//         id: "AskIssue",
//         message: "Please select your issue from the options below.",
//         trigger: "issues",
//       },
//       {
//         id: "issues",
//         options: [
//           {
//             value: "Restaurant Enquiry",
//             label: "Restaurant Enquiry",
//             trigger: "RestaurantEnquiry",
//           },
//           {
//             value: "Food Enquiry",
//             label: "Food Enquiry",
//             trigger: "FoodEnquiry",
//           },
//           {
//             value: "Tiffin Enquiry",
//             label: "Tiffin Enquiry",
//             trigger: "TiffinEnquiry",
//           },
//           {
//             value: "Delivery Issue",
//             label: "Delivery Issue",
//             trigger: "DeliveryIssue",
//           },
//         ],
//       },
//       {
//         id: "RestaurantEnquiry",
//         message: "Here is a brief about our restaurant:",
//         trigger: "RestaurantDetails",
//       },
//       {
//         id: "RestaurantDetails",
//         message: "Restaurant Details...",
//         trigger: "AnythingElse",
//       },
//       {
//         id: "FoodEnquiry",
//         message:
//           "For food enquiry, please contact our restaurant at: 123-456-7890. You can also view our menu at: https://example.com/menu",
//           trigger: "AnythingElse",
//       },
//       {
//         id: "TiffinEnquiry",
//         message:
//           "For tiffin enquiries, please contact our restaurant at: 123-456-7890. You can find more details about our tiffin service at: https://example.com/tiffin",
//           trigger: "AnythingElse",
//       },
//       {
//         id: "DeliveryIssue",
//         message: "Please provide your order ID.",
//         trigger: "order",
//       },
//       {
//         id: "order",
//         user: true,
//         trigger: "DeliveryIssueConfirmation",
//       },
//       {
//         id: "DeliveryIssueConfirmation",
//         message:
//           "Thank you for providing your order ID. Our team will contact you shortly.",
//           trigger: "AnythingElse",
//       },
//       {
//         id: "AnythingElse",
//         message: "Is there anything else I can help you with?",
//         trigger: "FinalResponse",
//       },
//       {
//         id: "FinalResponse",
//         options: [
//           { value: "Yes", label: "Yes", trigger: "AskIssue" },
//           { value: "No", label: "No", trigger: "Goodbye" },
//         ],
//       },
//       {
//         id: "Goodbye",
//         message: "Thank you for contacting us. Have a good day!",
//         end: true,
//       },
//     ];
  
//     return (
//       <div className={style.chatbotContainer}>
//         <div
//           className={style.chatbotIcon}
//           onClick={toggleChatBot}
//         >
//           <div className={style.icon}>
//             {isOpen ? <FaTimes size="30" /> : <FaRobot size="30" />}
//           </div>
//         </div>
//         {isOpen && (
//           <Segment className={style.chatbotSegment}>
//             <ChatBot steps={steps} />
//           </Segment>
//         )}
//       </div>
//     );
  
// }

// export default ChatBots

import style from './ChatBot.module.css';
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";
import { FaRobot, FaTimes } from "react-icons/fa";

function ChatBots() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatBot = () => {
        setIsOpen(!isOpen);
    };

    const steps = [
        {
            id: 'Greet',
            message: 'Hello, Welcome to our Ecommerce Store!',
            trigger: 'AskName'
        },
        {
            id: 'AskName',
            message: 'What is your name?',
            trigger: 'Name'
        },
        {
            id: 'Name',
            user: true,
            trigger: 'AskPhoneNumber'
        },
        {
            id: 'AskPhoneNumber',
            message: 'Could you please provide your phone number?',
            trigger: 'Phone'
        },
        {
            id: 'Phone',
            user: true,
            trigger: 'AskIssue'
        },
        {
            id: 'AskIssue',
            message: 'Please select your query from the options below.',
            trigger: 'issues'
        },
        {
            id: 'issues',
            options: [
                { value: 'Order Status', label: 'Order Status', trigger: 'OrderStatus' },
                { value: 'Product Inquiry', label: 'Product Inquiry', trigger: 'ProductInquiry' },
                { value: 'Refund Issue', label: 'Refund Issue', trigger: 'RefundIssue' },
                { value: 'Other', label: 'Other', trigger: 'OtherIssue' }
            ]
        },
        {
            id: 'OrderStatus',
            message: 'Please provide your Order ID.',
            trigger: 'order'
        },
        {
            id: 'order',
            user: true,
            trigger: 'OrderStatusResponse'
        },
        {
            id: 'OrderStatusResponse',
            message: 'Thank you! We are fetching the status of your order.',
            trigger: 'AnythingElse'
        },
        {
            id: 'ProductInquiry',
            message: 'Please provide the product name or ID you are inquiring about.',
            trigger: 'product'
        },
        {
            id: 'product',
            user: true,
            trigger: 'ProductInquiryResponse'
        },
        {
            id: 'ProductInquiryResponse',
            message: 'Thank you! Our team will contact you shortly with product details.',
            trigger: 'AnythingElse'
        },
        {
            id: 'RefundIssue',
            message: 'Please provide your Order ID related to the refund issue.',
            trigger: 'refundOrder'
        },
        {
            id: 'refundOrder',
            user: true,
            trigger: 'RefundResponse'
        },
        {
            id: 'RefundResponse',
            message: 'Thank you! Our refund team will contact you soon.',
            trigger: 'AnythingElse'
        },
        {
            id: 'OtherIssue',
            message: 'Please describe your issue briefly.',
            trigger: 'otherIssueDescription'
        },
        {
            id: 'otherIssueDescription',
            user: true,
            trigger: 'OtherIssueResponse'
        },
        {
            id: 'OtherIssueResponse',
            message: 'Thank you for your input. Our team will get back to you soon.',
            trigger: 'AnythingElse'
        },
        {
            id: 'AnythingElse',
            message: 'Is there anything else I can assist you with?',
            trigger: 'FinalResponse'
        },
        {
            id: 'FinalResponse',
            options: [
                { value: 'Yes', label: 'Yes', trigger: 'AskIssue' },
                { value: 'No', label: 'No', trigger: 'Goodbye' }
            ]
        },
        {
            id: 'Goodbye',
            message: 'Thank you for shopping with us. Have a great day!',
            end: true
        }
    ];

    return (
        <div className={style.chatbotContainer}>
            <div
                className={style.chatbotIcon}
                onClick={toggleChatBot}
            >
                <div className={style.icon}>
                    {isOpen ? <FaTimes size="30" /> : <FaRobot size="30" />}
                </div>
            </div>
            {isOpen && (
                <Segment className={style.chatbotSegment}>
                    <ChatBot steps={steps} />
                </Segment>
            )}
        </div>
    );
}

export default ChatBots;
