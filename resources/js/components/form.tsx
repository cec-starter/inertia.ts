export function Form({
    onSubmit,
    ...props
}: React.FormHTMLAttributes<HTMLFormElement> & { onSubmit(): void }) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            {...props}
        />
    );
}
