import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'

interface CountdownProps {
  secondsToMerge: number
  onTimeOver?: () => void
}

export default function Countdown(props: CountdownProps) {
  const expiryDate = new Date(props.secondsToMerge * 1000 + new Date().getTime())
  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp: expiryDate,
    autoStart: true,
    onExpire: props.onTimeOver,
  })
  useEffect(() => {
    console.log(props.secondsToMerge)
    const expiryDate = new Date(props.secondsToMerge * 1000 + new Date().getTime())
    console.log(expiryDate)

    restart(expiryDate, true)
  }, [props.secondsToMerge])
  return (
    <div>
      <h3>Time to merge:</h3>
      <p style={{ fontSize: 16 }}>
        {days > 0 && <>{days} days</>}
        &ensp;
        {hours > 0 && <>{hours} hours</>}
        &ensp;
        {minutes > 0 && <>{minutes} minutes</>}
        &ensp;
        {seconds > 0 && <>{seconds} seconds</>}
      </p>
    </div>
  )
}
