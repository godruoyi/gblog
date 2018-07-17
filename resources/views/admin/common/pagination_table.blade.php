<div class="table-responsive">
    <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-hover no-footer" id="dataTable">
                    <thead>
                        <tr>
                            @foreach ($fields as $field)
                                <td>{{ is_array($field) ? array_get($field, 'name', ' - ') : $field }}</td>
                            @endforeach
                            <td>操 作</td>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($datas as $item)
                            <tr>
                                @foreach ($fields as $key => $field)
                                    @if (isset($item->{$key}))
                                        <td>{!! ((isset($field['callback']) && is_callable($field['callback'])) ? $field['callback']($item->{$key}, $item) : $item->{$key}) !!}</td>
                                    @else
                                        <td> - </td>
                                    @endif
                                @endforeach
                                <td class="no-sort no-click" id="bread-actions">
                                    <a href="{{ route('admin.'. $name .'.edit', $item->id) }}" class="btn btn-sm btn-info">
                                        <i class="voyager-hammer"></i>
                                        <span class="hidden-xs hidden-sm">编 辑</span>
                                    </a>
                                    {{-- <a href="javascript:;" data-id="{{ $item->id }}" class="btn btn-sm btn-warning delete">
                                        <i class="voyager-trash"></i>
                                        <span class="hidden-xs hidden-sm">删 除</span>
                                    </a> --}}

                                    {{-- <form action="{{ route('admin.'. $name .'.index') }}" method="post" id="delete-form">
                                        {{ csrf_field() }}
                                        {{ method_field('DELETE') }}
                                    </form> --}}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        @include('admin.common.pagination', ['data' => $datas])
    </div>
</div>

@push('javascript')
    {{-- <script>
        $(document).ready(function () {
            $('.delete').click(function () {
                var $form = $('#delete-form');
                var action = $form.attr('action');
                $form.attr('action', action + "/" + $(this).data('id'))
                $form.submit();
            })
        });
    </script> --}}
@endpush
