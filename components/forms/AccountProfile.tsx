"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {form} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const form  = useForm({
    resolver:zodResolver
  });
  return <form>AccountProfile</form>;
};

export default AccountProfile;
