import React from 'react'

function TodoCalender() {
  const date = new Date()
  const day = date.getDate()
  const weekDay = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][date.getDay()]

  const month = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ][date.getMonth()]

  const enOrdinalRules = new Intl.PluralRules('pt-br', {
    type:'ordinal'
  })
  const enOrdinalRulesMap = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other:'th'
  }

  const enOrdinalSuffix = enOrdinalRulesMap[enOrdinalRules.select(day)]

  return (
    <div className='todo_calender'>
        <h1>{`${weekDay}, ${day}${enOrdinalSuffix}`}</h1>
        <p className="month">{month}</p>
    </div>
  )
}

export default TodoCalender
