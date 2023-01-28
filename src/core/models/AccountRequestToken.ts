export interface AccountRequestToken {
     expires_at: string;
     request_token: string;
     success: boolean
}
export interface GuestRequestToken {
     expires_at: string;
     guest_session_id: string;
     success: boolean
}