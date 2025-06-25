export {};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme: 'outline' | 'filled_blue' | 'filled_black';
              size: 'small' | 'medium' | 'large';
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }

  interface CredentialResponse {
    credential: string;
    select_by: string;
  }
}
