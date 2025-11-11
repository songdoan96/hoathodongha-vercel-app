VITE_ONESIGNAL_APP_ID="6661b28a-59c8-44f2-90d1-48e8981b281d"
VITE_BACKEND_URL="http://localhost:8888/api/"

<tr
                    key={form.id}
                    className={
                      form.chuaxong && checkRole("tochuc") ? "bg-red-100 z-50" : "bg-white"
                    }
                  >
                    <td className="p-1 border border-black text-center" title={`${form.id}`}>
                      {checkRole("tochuc") ? (
                        <Link className="underline font-bold" to={routers().forms.edit(form.id)}>
                          {format(form.ngaytao, "dd/MM")}
                        </Link>
                      ) : (
                        <>{format(form.ngaytao, "dd/MM")}</>
                      )}
                    </td>
                    <td className="p-1 border border-black bg-white md:bg-transparent sticky left-0 min-w-16">
                      {form.hoten}
                    </td>
                    <td className="p-1 border border-black bg-white md:bg-transparent sticky left-16 min-w-12 text-center">
                      {linesList.find((line) => line.value == form.to)?.name}
                    </td>
                    <td className="p-1 border border-black text-center">{form.msnv}</td>
                    <td className="p-1 border border-black">
                      <div className="flex justify-center items-center">
                        {form.loaidon === "leave" ? (
                          <Link
                            to={routers().forms.detail(form.id)}
                            className="inline-block text-center font-semibold min-w-20 text-teal-100 bg-teal-500 p-1 rounded"
                          >
                            Nghỉ phép
                          </Link>
                        ) : (
                          <Link
                            to={routers().forms.detail(form.id)}
                            className="inline-block text-center font-semibold min-w-20 text-pink-100 bg-pink-500 p-1 rounded"
                          >
                            Ra cổng
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="p-1 border border-black min-w-28">
                      {form.loaidon == "leave" ? (
                        <div className="text-center">
                          <p className="font-bold text-teal-500">{form.songaynghi} ngày</p>
                          <p>
                            ( {form.tungay && formatDate(form.tungay, "dd/MM")} -
                            {form.denngay && formatDate(form.denngay, "dd/MM")} )
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="font-bold text-pink-500">{`${form.tugio} - ${form.dengio}`}</p>
                          <p>(ngày {form.rangay && formatDate(form.rangay, "dd/MM")})</p>
                        </div>
                      )}
                    </td>
                    <td className="p-1 border border-black">{form.lydo}</td>
                    <td className="p-1 border border-black">
                      <div className="flex justify-center items-center">
                        {form.thaythe ? <CheckCircle color="green" /> : <CircleXIcon color="red" />}
                      </div>
                    </td>
                    <td className="p-1 border border-black max-w-36">
                      <div className="flex items-center justify-center">
                        {form.totruong ? (
                          form.totruong
                        ) : (
                          <>
                            {/* {!form.totruong && needToTruong && <X color="red" size={20} />}
                            {user && user.bophan === form.to && (
                              <FormTT
                                mutationSignature={mutationSignature}
                                user={user}
                                form={form}
                              />
                            )} */}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-1 border border-black">
                      <div className="flex items-center justify-center">
                        {/* {!form.quandoc && needQuanDoc && <X color="red" size={20} />} */}
                        {/* {form.quandoc
                          ? form.quandoc
                          : user &&
                            user.bophan.includes("quandoc") &&
                            ((needToTruong && needQuanDoc && form.totruong) ||
                              (!needToTruong && needQuanDoc)) &&
                            user.bophan.startsWith(form.to.split("_")[0]) && (
                              <Button
                                className="underline"
                                onClick={() =>
                                  mutationSignature.mutate({
                                    id: form.id.toString(),
                                    values: {
                                      hoten: user.name,
                                      chucvu: "quandoc",
                                    },
                                  })
                                }
                                variant="link"
                              >
                                Ký đơn
                              </Button>
                            )} */}
                      </div>
                    </td>
                    <td className="p-1 border border-black">
                      <div className="flex items-center justify-center">
                        {!form.lanhdao && <X color="red" size={20} />}
                        {/* {form.lanhdao
                          ? form.lanhdao
                          : user &&
                            user.bophan === "lanhdao" &&
                            ((!needToTruong && !needQuanDoc) ||
                              (needToTruong && needQuanDoc && form.quandoc) ||
                              (needToTruong && !needQuanDoc && form.totruong) ||
                              (!needToTruong && needQuanDoc && form.quandoc)) && (
                              <Button
                                className="underline"
                                onClick={() =>
                                  mutationSignature.mutate({
                                    id: form.id.toString(),
                                    values: {
                                      hoten: user.name,
                                      chucvu: "lanhdao",
                                    },
                                  })
                                }
                                variant="link"
                              >
                                Ký đơn
                              </Button>
                            )} */}
                      </div>
                    </td>
                    <td className="p-1 border border-black">
                      {form.loaidon === "out" && (
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-blue-500 font-bold">
                            {form.giora || <History color="red" size={18} />}
                          </span>
                          <ChevronsRight size={14} />
                          <span className="text-blue-500 font-bold">
                            {form.giovao || <History color="red" size={18} />}
                          </span>
                        </div>
                      )}
                    </td>
                    {checkRole("tochuc") && (
                      <td className="p-1 border border-black">
                        <div className="flex justify-center items-center gap-1">
                          {form.chuaxong ? (
                            <Square
                              // onClick={() => handleUpdateStatus(form.id.toString(), form.chuaxong)}
                              color="red"
                              size={20}
                              className="cursor-pointer"
                            />
                          ) : (
                            <SquareCheck
                              // onClick={() => handleUpdateStatus(form.id.toString(), form.chuaxong)}
                              color="green"
                              size={20}
                              className="cursor-pointer"
                            />
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Trash2 color="red" size={20} />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Xác nhận xóa?</AlertDialogTitle>
                                <AlertDialogDescription />
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  // onClick={() => handleDelete(form.id.toString())}
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    )}
                  </tr>
