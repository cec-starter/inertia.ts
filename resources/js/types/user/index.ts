export interface UserType {
    id: number;
    name: string;
    email: string;
    gravatar: string;
    roles: string[];
    created_at: string;
    updated_at: string;
}

export interface PasswordFormProps {
    data: {
        password: string;
        password_confirmation: string;
    };
    errors: {
        password?: string;
        password_confirmation?: string;
    };
    onChange: (e: any) => void;
}

export interface UserDetailDialogProps {
    open: boolean;
    user: UserType | null;
    onClose: () => void;
}

export interface UserBulkDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedUsersBulk: UserType[];
    onSuccess: () => void;
}
