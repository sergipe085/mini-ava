"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { revalidatePath } from 'next/cache';
import React, { useState } from 'react';

type Props = {
    action: () => Promise<void>;
    children: React.ReactNode;
};

export function ConfirmationModal({ children, action }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleAction() {
        setLoading(true);
        await action();
        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja deletar?</DialogTitle>
                    <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex flex-row gap-2 justify-center'>
                    <Button onClick={handleAction} disabled={loading} variant={"destructive"}>Deletar</Button>
                    <DialogClose>
                        <Button variant={"outline"} disabled={loading}>Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}