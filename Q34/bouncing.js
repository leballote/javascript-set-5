const G = 9.81 / 0.0254;
// const G = 9.81;

export function* modelBounce(dt = 0.0001, h0 = 10) {
  //Gravity is taken transformed into inches/s**2
  let v = 0;
  let t = 0;
  let h = h0;

  let n = 10; //max height bounce

  while (true) {
    h = h + v * dt - (dt ** 2 * G) / 2; // update from previous instant (gotten from taylor series)
    v = v - G * dt; // update from previous instant (also from taylor)

    if (h < 0) {
      h = 0; // correcting error
      n -= 1;
      v = Math.sqrt(Math.max(2 * n * G, 0)); //little hack to get the wanted heights, as a side note, we need a small dt to get them right; it is equivalent of having a different coefficient of restitution for each bounce
    }

    yield { t, h, v, n }; // this three values encapsulate completly the state of the model

    //actually, theorethically you could compute any of these variables only from t, but I found this implementation a bit more handy for this specific use case.
  }
}
