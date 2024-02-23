/* eslint-disable no-unused-vars */
//import './App.css';
//import {Theme} from '@twilio-paste/core/theme';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from './Message';
// import {Box} from '@twilio-paste/core/box';
// import {PlusIcon} from '@twilio-paste/icons/esm/PlusIcon';
// import {InformationIcon} from '@twilio-paste/icons/esm/InformationIcon';
// import {ChevronRightIcon} from '@twilio-paste/icons/esm/ChevronRightIcon';

// import {Heading} from '@twilio-paste/core/heading';
// import {
//   PageHeader,
//   PageHeaderActions,
//   PageHeaderDetails,
//   PageHeaderHeading,
//   PageHeaderInPageNavigation,
//   PageHeaderKeyword,
//   PageHeaderMeta,
//   PageHeaderParagraph,
//   PageHeaderPrefix,
//   PageHeaderSetting,
//   PageHeaderSeparator,
// } from '@twilio-paste/core/page-header';
// import {Breadcrumb, BreadcrumbItem} from '@twilio-paste/core/breadcrumb';
// import {Button} from '@twilio-paste/core/button';
// import {InPageNavigation, InPageNavigationItem} from '@twilio-paste/core/in-page-navigation';
// import {DescriptionList, DescriptionListSet, DescriptionListTerm, DescriptionListDetails} from '@twilio-paste/core/description-list';
// import { useUID } from "@twilio-paste/core/uid-library";
// import {Table, THead, Tr, Th, TBody, Td, TFoot} from '@twilio-paste/core/table';
// import {RadioButtonGroup, RadioButton} from '@twilio-paste/core/radio-button-group';
// import {
//   Sidebar,
//   SidebarOverlayContentWrapper,
//   SidebarBody,
//   SidebarHeader,
//   SidebarHeaderLabel,
//   SidebarHeaderIconButton,
//   SidebarFooter,
//   SidebarCollapseButton,
//   SidebarNavigation,
//   SidebarNavigationItem,
//   SidebarNavigationDisclosure,
//   SidebarNavigationDisclosureHeading,
//   SidebarNavigationDisclosureHeadingWrapper,
//   SidebarNavigationDisclosureContent,
// } from '@twilio-paste/core/sidebar';
// import {Badge} from '@twilio-paste/core/badge';
// import {DetailText} from '@twilio-paste/core/detail-text';
// import {Text} from '@twilio-paste/text';
// import {Toast, Toaster} from '@twilio-paste/core/toast';
// import { WarningIcon } from "@twilio-paste/icons/esm/WarningIcon";
// import {
//   ProgressSteps,
//   ProgressStepIncomplete,
//   ProgressStepComplete,
//   ProgressStepCurrent,
//   ProgressStepError,
//   ProgressStepSeparator,
// } from '@twilio-paste/core/progress-steps';
// import {
//   Form,
//   FormSection,
//   FormSectionHeading,
//   FormControl,
//   FormActions
// } from '@twilio-paste/core/form';
// import {Input, input1, input2, input3, input4, input5, input6} from '@twilio-paste/core/input';
// import {Label} from '@twilio-paste/core/label';
// import {HelpText} from '@twilio-paste/core/help-text';
// import {Paragraph} from '@twilio-paste/core/paragraph';
// import {
//   DataGrid,
//   DataGridHead,
//   DataGridRow,
//   DataGridHeader,
//   DataGridBody,
//   DataGridCell,
//   DataGridFoot,
// } from '@twilio-paste/core/data-grid';
// import {ButtonGroup} from '@twilio-paste/core/button-group';

// import { Grid, Column } from '@twilio-paste/core/grid';
// import { Card } from '@twilio-paste/core/card';
// import { Stack } from '@twilio-paste/core/stack';
// import { Anchor } from '@twilio-paste/core/anchor';
// import { Alert } from '@twilio-paste/core/alert';
// import { OrderedList, UnorderedList, ListItem } from '@twilio-paste/core/list';
// import { Disclosure, DisclosureHeading, DisclosureContent } from '@twilio-paste/core/disclosure';
// import { Separator } from '@twilio-paste/core/separator';
// import {TextArea} from '@twilio-paste/core/textarea';
// import {HelpText} from '@twilio-paste/core/help-text';


const socket = io('http://localhost:5001');
//const socket = io('http://mc.developmenttree.com:5001');

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('sendMessage', { text: messageText });
    setMessageText('');
  };

  return (
    <div className="App">
      <h1>PubSub App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} username={message.username} text={message.text} />
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;