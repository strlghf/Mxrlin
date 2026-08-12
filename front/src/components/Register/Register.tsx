import { useForm } from "react-hook-form";

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ mode: "onBlur" });

  const onSubmit = async(data) => {
    // 
  }
}