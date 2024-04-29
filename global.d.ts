type Messages = typeof import("@/messages/en.json");
type PtMessages = typeof import("@/messages/pt.json");

declare interface IntlMessages extends Messages, PtMessages {}