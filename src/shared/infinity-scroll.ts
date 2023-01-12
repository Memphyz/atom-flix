import { SyntheticEvent } from 'react';

export const handleScroll = (next: (...args) => void, event: SyntheticEvent): void => {
     const offset = 100;
     const element = (event.target as HTMLElement);
     const scrollHeight = element.scrollHeight - element.clientHeight - offset;
     const scrollTop = element.scrollTop;
     next && scrollHeight < scrollTop && next();
}