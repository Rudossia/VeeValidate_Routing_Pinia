<script setup>
import { computed } from 'vue'
import { useField, useForm } from 'vee-validate'

const { handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: '',
    agreement: false,
  },
})

function validateEmail(value) {
  if (!value) {
    return 'Email обязателен'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Введите корректный email'
  }
  return true
}

function validatePassword(value) {
  if (!value) {
    return 'Пароль обязателен'
  }
  if (!passwordCriteria.value.minLength) {
    return 'Пароль должен содержать не менее 8 символов'
  }
  if (!passwordCriteria.value.hasDigit) {
    return 'Пароль должен содержать хотя бы одну цифру'
  }
  if (!passwordCriteria.value.hasLowercase) {
    return 'Пароль должен содержать букву нижнего регистра'
  }
  if (!passwordCriteria.value.hasUppercase) {
    return 'Пароль должен содержать букву верхнего регистра'
  }
  if (!passwordCriteria.value.hasSpecial) {
    return 'Пароль должен содержать спецсимвол'
  }
  return true
}

function validateAgreement(value) {
  if (!value) {
    return 'Необходимо согласиться с лицензионным соглашением'
  }
  return true
}
const {
  value: email,
  errorMessage: emailError,
  meta: emailMeta,
} = useField('email', validateEmail)
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
} = useField('password', validatePassword)
const {
  value: agreement,
  errorMessage: agreementError,
  meta: agreementMeta,
} = useField('agreement', validateAgreement, {
  type: 'checkbox',
})

const passwordCriteria = computed(() => { const value = password.value || ''
  return {
    minLength: value.length >= 8,
    hasDigit: /\d/.test(value),
    hasLowercase: /[a-zа-я]/.test(value),
    hasUppercase: /[A-ZА-Я]/.test(value),
    hasSpecial: /[^A-Za-zА-Яа-я0-9]/.test(value),
  }
})

const isPasswordValid = computed(() => {return Object.values(passwordCriteria.value).every(Boolean)})

const isFormValid = computed(() => {
  return (
    emailMeta.valid &&
    passwordMeta.valid &&
    isPasswordValid.value &&
    agreement.value
  )
})

const emailClass = computed(() => {
  if (!email.value) {
    return ''
  }
  return emailMeta.valid ? 'valid' : 'invalid'
})

const passwordClass = computed(() => {
  if (!password.value) {
    return ''
  }
  return isPasswordValid.value ? 'valid' : 'invalid'
})

const onSubmit = handleSubmit((values) => {
  alert(
    `Регистрация выполнена успешно!\n\nEmail: ${values.email}\nPassword: ${values.password}`
  )
})
</script>

<template>
  <main class="page">
    <section class="form-card">
      <h1>Registration</h1>

      <form @submit="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            :class="emailClass"
            type="email"
            placeholder="example@mail.com"
          />
          <p v-if="emailError && emailMeta.touched" class="error">
            {{ emailError }}
          </p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            :class="passwordClass"
            type="password"
            placeholder="Введите пароль"
          />
          <p v-if="passwordError && passwordMeta.touched" class="error">
            {{ passwordError }}
          </p>
          <ul class="password-list">
            <li :class="passwordCriteria.minLength ? 'done' : 'fail'">
              Длина не менее 8
            </li>
            <li :class="passwordCriteria.hasDigit ? 'done' : 'fail'">
              Цифры
            </li>
            <li :class="passwordCriteria.hasLowercase ? 'done' : 'fail'">
              Буквы нижнего регистра
            </li>
            <li :class="passwordCriteria.hasUppercase ? 'done' : 'fail'">
              Буквы верхнего регистра
            </li>
            <li :class="passwordCriteria.hasSpecial ? 'done' : 'fail'">
              Спецсимволы
            </li>
          </ul>
        </div>
        <label class="agreement">
          <input v-model="agreement" type="checkbox" />
          I agree with license agreement
        </label>
        <p v-if="agreementError && agreementMeta.touched" class="error">
          {{ agreementError }}
        </p>
        <button type="submit" :disabled="!isFormValid">
          Register
        </button>
      </form>
    </section>
  </main>
</template>