import React, { useEffect, useState } from "react";
import { Dashboard, Event, Accounts } from ".";

// type ComponentName = `dashboard` | `event` | `accounts`

interface RendererProps {
  component?: string;
  className?: string;
}

const Renderer: React.FC<RendererProps> = ({ component, className }) => {
  const [componentName, setComponentName] = useState<string | undefined>();

  useEffect(() => {
    setComponentName(component);
  }, [component]);

  switch (componentName?.toLowerCase()) {
    case `dashboard`: {
      return <Dashboard className={className} />;
    }
    case `event`: {
      return <Event />;
    }
    case `accounts`: {
      return <Accounts />;
    }
    default: {
      return <Dashboard className={className} />;
    }
  }
};

export default Renderer;
