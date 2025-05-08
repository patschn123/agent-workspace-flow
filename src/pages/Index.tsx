
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { NanoCard } from "@/components/nano-card";
import { NanoButton } from "@/components/ui/nano-button";
import { Plus, User, Users, Compass, ArrowRight } from "lucide-react";
import { ChatInput } from "@/components/chat-input";
import { ChatMessage } from "@/components/chat-message";

const Index = () => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [activeView, setActiveView] = useState<"dashboard" | "chat" | "split" | "team">("dashboard");
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    isNano: boolean;
    timestamp: string;
  }>>([
    {
      id: "1",
      text: language === "en" 
        ? "Hello! I'm your personal Nano. How can I assist you today?"
        : "Hallo! Ich bin dein persönlicher Nano. Wie kann ich dir heute helfen?",
      isNano: true,
      timestamp: "12:00 PM",
    }
  ]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isNano: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate Nano response
    setTimeout(() => {
      const nanoResponse = {
        id: (Date.now() + 1).toString(),
        text: language === "en"
          ? "I'm processing your request. How can I help you further?"
          : "Ich verarbeite deine Anfrage. Wie kann ich dir weiterhelfen?",
        isNano: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, nanoResponse]);
    }, 1000);
  };

  // Sample data
  const recentWorkspaces = [
    { 
      id: "1", 
      title: language === "en" ? "My Personal Workspace" : "Mein persönlicher Arbeitsbereich", 
      type: language === "en" ? "Personal Nano" : "Persönlicher Nano" as any,
      icon: <User size={18} />,
      onClick: () => setActiveView("chat")
    },
    { 
      id: "2", 
      title: language === "en" ? "Document Analysis" : "Dokumentenanalyse",
      type: language === "en" ? "Personal Nano" : "Persönlicher Nano" as any,
      icon: <User size={18} />,
      onClick: () => setActiveView("split")
    },
    { 
      id: "3", 
      title: language === "en" ? "Marketing Team" : "Marketing-Team", 
      type: language === "en" ? "Team Nano" : "Team-Nano" as any,
      icon: <Users size={18} />,
      onClick: () => setActiveView("team")
    },
    { 
      id: "4", 
      title: language === "en" ? "Product Demo" : "Produkt-Demo", 
      type: language === "en" ? "Showcase" : "Showcase" as any, 
      icon: <Compass size={18} />
    }
  ];

  const renderDashboard = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {language === "en" ? "Recents" : "Neueste"}
        </h1>
        <NanoButton variant="accent" className="flex items-center gap-2">
          <Plus size={16} />
          {language === "en" ? "Create New" : "Neu erstellen"}
        </NanoButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentWorkspaces.map((workspace) => (
          <NanoCard
            key={workspace.id}
            title={workspace.title}
            type={workspace.type}
            icon={workspace.icon}
            onClick={workspace.onClick}
          />
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            {language === "en" ? "My Personal Workspace" : "Mein persönlicher Arbeitsbereich"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? "Chat with your Personal Nano" : "Chatte mit deinem persönlichen Nano"}
          </p>
        </div>
        <NanoButton 
          variant="ghost" 
          size="sm"
          onClick={() => setActiveView("dashboard")}
          className="flex items-center gap-1"
        >
          {language === "en" ? "Back" : "Zurück"}
          <ArrowRight size={16} />
        </NanoButton>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-secondary/20">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.text}
            isNano={msg.isNano}
            timestamp={msg.timestamp}
            userName={language === "en" ? "You" : "Du"}
            className="mb-4"
          />
        ))}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        placeholder={language === "en" ? "Type a message..." : "Nachricht eingeben..."}
      />
    </div>
  );

  const renderSplitView = () => (
    <div className="flex flex-col h-full md:grid md:grid-cols-2 md:divide-x">
      <div className="flex flex-col h-full">
        <div className="border-b p-4">
          <h2 className="font-semibold">
            {language === "en" ? "Document Analysis" : "Dokumentenanalyse"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? "Chat with your Personal Nano" : "Chatte mit deinem persönlichen Nano"}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-secondary/20">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.text}
              isNano={msg.isNano}
              timestamp={msg.timestamp}
              userName={language === "en" ? "You" : "Du"}
              className="mb-4"
            />
          ))}
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          placeholder={language === "en" ? "Type a message..." : "Nachricht eingeben..."}
        />
      </div>
      
      <div className="hidden md:flex md:flex-col h-full">
        <div className="border-b p-4">
          <h2 className="font-semibold">
            {language === "en" ? "Content Preview" : "Inhaltsvorschau"}
          </h2>
        </div>
        
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-mint-green p-8 rounded-xl mb-4">
              <svg className="mx-auto h-12 w-12 text-light-sea-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">
              {language === "en" ? "Upload a document to analyze" : "Lade ein Dokument zur Analyse hoch"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "en" ? "Your Personal Nano will help you process it." : "Dein persönlicher Nano hilft dir bei der Verarbeitung."}
            </p>
            <NanoButton variant="default">
              {language === "en" ? "Upload Document" : "Dokument hochladen"}
            </NanoButton>
          </div>
        </div>
      </div>
      
      <NanoButton 
        variant="ghost" 
        size="sm"
        onClick={() => setActiveView("dashboard")}
        className="md:hidden mt-4 mx-4 flex items-center gap-1"
      >
        {language === "en" ? "Back to Dashboard" : "Zurück zum Dashboard"}
        <ArrowRight size={16} />
      </NanoButton>
    </div>
  );

  const renderTeamView = () => (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            {language === "en" ? "Marketing Team" : "Marketing-Team"}
          </h2>
          <div className="flex items-center mt-1">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-orange-peel"></div>
              <div className="w-6 h-6 rounded-full bg-hunyadi-yellow"></div>
              <div className="w-6 h-6 rounded-full bg-mint-green"></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {language === "en" ? "3 members" : "3 Mitglieder"}
            </span>
          </div>
        </div>
        <NanoButton 
          variant="ghost" 
          size="sm"
          onClick={() => setActiveView("dashboard")}
          className="flex items-center gap-1"
        >
          {language === "en" ? "Back" : "Zurück"}
          <ArrowRight size={16} />
        </NanoButton>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-secondary/20">
        <ChatMessage
          message={language === "en" 
            ? "Hello team! I'm your shared Nano. Let me know how I can assist with your marketing projects."
            : "Hallo Team! Ich bin euer gemeinsamer Nano. Lasst mich wissen, wie ich bei euren Marketing-Projekten helfen kann."}
          isNano={true}
          timestamp="12:00 PM"
          className="mb-4"
        />
        
        <ChatMessage
          message={language === "en" 
            ? "Can you help us brainstorm ideas for the new campaign?"
            : "Kannst du uns helfen, Ideen für die neue Kampagne zu sammeln?"}
          isNano={false}
          userName="Sarah"
          timestamp="12:02 PM"
          className="mb-4"
        />
        
        <ChatMessage
          message={language === "en" 
            ? "Absolutely! Let's start by examining our target audience and key objectives..."
            : "Absolut! Beginnen wir mit der Untersuchung unserer Zielgruppe und der wichtigsten Ziele..."}
          isNano={true}
          timestamp="12:03 PM"
          className="mb-4"
        />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        placeholder={language === "en" ? "Message the team..." : "Nachricht an das Team..."}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case "chat":
        return renderChat();
      case "split":
        return renderSplitView();
      case "team":
        return renderTeamView();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar onMenuToggle={() => setShowMobileMenu(!showMobileMenu)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className={showMobileMenu ? "absolute z-10 h-full animate-slide-in-right" : ""} />
        
        <main className="flex-1 overflow-y-auto bg-background">
          {renderContent()}
        </main>
      </div>
      
      <BottomNav language={language} />
    </div>
  );
};

export default Index;
